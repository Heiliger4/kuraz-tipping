import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import confetti from 'canvas-confetti'

// Types
type Route = 'home' | 'profile'

interface NotificationState {
  show: boolean
  message: string
  type: 'tip' | 'rating' | 'shame'
  amount?: number | null
  rating?: string | null
}

interface TipState {
  selectedTip: string
  customTip: string
  finalTip: number | null
  isRandom: boolean
}

interface RatingState {
  selectedRating: string | null
  sent: boolean
}

interface AppState {
  // Navigation
  currentRoute: Route
  
  // Tip state
  tip: TipState
  
  // Rating state
  rating: RatingState
  
  // Notification system
  notification: NotificationState
  
  // Actions
  setRoute: (route: Route) => void
  
  // Tip actions
  setSelectedTip: (value: string) => void
  setCustomTip: (value: string) => void
  setFinalTip: (amount: number | null, isRandom?: boolean) => void
  resetTipRandom: () => void
  submitTip: () => void
  
  // Rating actions
  setRating: (rating: string | null) => void
  submitRating: () => void
  resetRating: () => void
  
  // Notification actions
  showNotification: (message: string, type: 'tip' | 'rating' | 'shame', data?: { amount?: number | null, rating?: string | null }) => void
  hideNotification: () => void
  
  // Confetti action
  triggerConfetti: (origin?: { x: number, y: number }) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentRoute: 'home',
        
        tip: {
          selectedTip: '',
          customTip: '',
          finalTip: null,
          isRandom: false,
        },
        
        rating: {
          selectedRating: null,
          sent: false,
        },
        
        notification: {
          show: false,
          message: '',
          type: 'tip',
          amount: null,
          rating: null,
        },
        
        // Navigation actions
        setRoute: (route) => set({ currentRoute: route }),
        
        // Tip actions
        setSelectedTip: (value) => set((state) => ({
          tip: {
            ...state.tip,
            selectedTip: value,
            customTip: '',
            finalTip: parseInt(value),
            isRandom: false,
          }
        })),
        
        setCustomTip: (value) => set((state) => ({
          tip: {
            ...state.tip,
            customTip: value,
            selectedTip: '',
            finalTip: value ? parseInt(value) : null,
            isRandom: false,
          }
        })),
        
        setFinalTip: (amount, isRandom = false) => set((state) => ({
          tip: {
            ...state.tip,
            selectedTip: isRandom ? '' : state.tip.selectedTip,
            customTip: isRandom ? '' : state.tip.customTip,
            finalTip: amount,
            isRandom,
          }
        })),
        
        resetTipRandom: () => set((state) => ({
          tip: {
            ...state.tip,
            isRandom: false,
          }
        })),
        
        submitTip: () => {
          const state = get()
          const { tip } = state
          const amount = tip.finalTip || (tip.customTip ? parseInt(tip.customTip) : (tip.selectedTip ? parseInt(tip.selectedTip) : null))
          
          if (!amount) return
          
          // Check if amount is below minimum
          if (amount < 20) {
            state.showNotification('🙄 Come on, don\'t be that person. 20 ETB minimum — show some class. 😗', 'shame')
            return
          }
          
          // Update tip state
          set((state) => ({
            tip: {
              ...state.tip,
              finalTip: amount,
            }
          }))
          
          // Show notification
          state.showNotification(`You tipped ${amount} ETB! 😎`, 'tip', { amount })
          
          // Trigger confetti
          state.triggerConfetti({ x: 0.5, y: 0.5 })
          
          console.log('User tip amount:', amount)
        },
        
        // Rating actions
        setRating: (rating) => set((state) => ({
          rating: {
            ...state.rating,
            selectedRating: rating,
          }
        })),
        
        submitRating: () => {
          const state = get()
          const { rating } = state
          
          if (!rating.selectedRating) return
          
          // Update rating state
          set((state) => ({
            rating: {
              ...state.rating,
              sent: true,
            }
          }))
          
          // Show notification
          state.showNotification(`You rated ${rating.selectedRating}/5! 🥰`, 'rating', { rating: rating.selectedRating })
          
          // Trigger confetti
          state.triggerConfetti({ x: 0.5, y: 0.5 })
          
          console.log('🚀 Rating sent:', rating.selectedRating)
          
          // Reset rating after 2 seconds
          setTimeout(() => {
            state.resetRating()
          }, 2000)
        },
        
        resetRating: () => set({
          rating: {
            selectedRating: null,
            sent: false,
          }
        }),
        
        // Notification actions
        showNotification: (message, type, data = {}) => {
          set({
            notification: {
              show: true,
              message,
              type,
              amount: data.amount || null,
              rating: data.rating || null,
            }
          })
          
          // Auto-hide after 3 seconds
          setTimeout(() => {
            get().hideNotification()
          }, 3000)
        },
        
        hideNotification: () => set({
          notification: {
            show: false,
            message: '',
            type: 'tip',
            amount: null,
            rating: null,
          }
        }),
        
        // Confetti action
        triggerConfetti: (origin = { x: 0.5, y: 0.5 }) => {
          confetti({
            particleCount: 150,
            spread: 90,
            origin,
            colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
          })
        },
      }),
      {
        name: 'kuraz-tipping-store',
        partialize: (state) => ({
          currentRoute: state.currentRoute,
          tip: {
            finalTip: state.tip.finalTip,
            isRandom: state.tip.isRandom,
          },
        }),
      }
    ),
    {
      name: 'kuraz-tipping-store',
    }
  )
)
