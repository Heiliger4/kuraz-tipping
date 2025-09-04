import { useId, memo } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/appStore"

const Rating = memo(() => {
  const id = useId()
  // Optimized selectors - only subscribe to needed state slices
  const rating = useAppStore((state) => state.rating)
  const notification = useAppStore((state) => state.notification)
  const setRating = useAppStore((state) => state.setRating)
  const submitRating = useAppStore((state) => state.submitRating)

  const handleSend = () => {
    submitRating()
  }

  return (
    <>
      <fieldset className="space-y-4">
        <legend className="text-foreground text-sm text-center leading-none font-medium">
          How likely are you to recommend me?
        </legend>

        <RadioGroup
          className="flex gap-0 -space-x-px rounded-md shadow-xs"
          onValueChange={(value) => setRating(value)}
          value={rating.selectedRating || ""}
        >
          {["0", "1", "2", "3", "4", "5"].map((value) => (
            <label
              key={value}
              className="border-input has-data-[state=checked]:border-primary/50 relative flex size-9 flex-1 cursor-pointer items-center justify-center border text-sm font-medium first:rounded-s-md last:rounded-e-md"
            >
              <RadioGroupItem
                id={`${id}-${value}`}
                value={value}
                className="sr-only"
              />
              {value}
            </label>
          ))}
        </RadioGroup>
      </fieldset>

      <div className="mt-4 flex justify-center">
        <Button variant="gradient" onClick={handleSend} disabled={!rating.selectedRating || rating.sent}>
          {rating.sent ? "Sent " : "Send"}
        </Button>
      </div>

      <div className="mt-1 flex justify-between text-xs font-medium">
        <p>
          <span className="text-base">😡</span> Not likely
        </p>
        <p>
          Very Likely <span className="text-base">😍</span>
        </p>
      </div>

      {/* Success Message */}
      {notification.show && notification.type === 'rating' && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-sm max-sm:px-3 max-sm:py-1.5 max-sm:text-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white dark:bg-transparent dark:hover:bg-accent text-white px-8 py-4 rounded-lg shadow-lg animate-in zoom-in-50 duration-300">
            <p className="font-medium text-lg">{notification.message}</p>
          </div>
        </div>
      )}
    </>
  )
})

Rating.displayName = 'Rating'

export default Rating
