import { useId, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function Rating() {
  const id = useId()
  const [selected, setSelected] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleSend = () => {
    if (!selected) return
    console.log("🚀 Rating sent:", selected)
    setSent(true)
    setShowMessage(true)

    // 🎉 Confetti explosion from center
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
    })

    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)

    // Reset after a while if you want
    setTimeout(() => {
      setSent(false)
      setSelected(null)
    }, 2000)
  }

  return (
    <>
      <fieldset className="space-y-4">
        <legend className="text-foreground text-sm text-center leading-none font-medium">
          How likely are you to recommend me?
        </legend>

        <RadioGroup
          className="flex gap-0 -space-x-px rounded-md shadow-xs"
          onValueChange={(value) => setSelected(value)}
          value={selected || ""}
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
        <Button variant="gradient" onClick={handleSend} disabled={!selected || sent}>
          {sent ? "Sent " : "Send"}
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
      {showMessage && selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-sm max-sm:px-3 max-sm:py-1.5 max-sm:text-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white dark:bg-transparent dark:hover:bg-accent text-white px-8 py-4 rounded-lg shadow-lg animate-in zoom-in-50 duration-300">
            <p className="font-medium text-lg">You rated {selected}/5!
              🥰</p>
          </div>
        </div>
      )}
    </>
  )
}
