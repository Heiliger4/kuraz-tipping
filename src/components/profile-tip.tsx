import { PinContainer } from "../components/ui/3d-pin"
import newImage from "@/assets/new.jpg";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useId, useRef } from "react"
import { useTipStore } from "@/store/tipStore";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import confetti from "canvas-confetti"
function ProfileTip() {
    const { tip, setTip, resetRandom } = useTipStore();

    const id = useId();
    const [selectedTip, setSelectedTip] = useState<string>("");
    const [customTip, setCustomTip] = useState<string>("");
    const [showMessage, setShowMessage] = useState(false);
    const [tippedAmount, setTippedAmount] = useState<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleTipButton = () => {
        const latest = tip || (customTip ? parseInt(customTip) : (selectedTip ? parseInt(selectedTip) : null));
        if (!latest) return;
        
        console.log("User tip amount:", latest);
        setTip(latest, false);
        setTippedAmount(latest);
        setShowMessage(true);
        
        // 🎉 Confetti explosion from center
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
        });
        
        // Hide message after 3 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    const items = [
        { value: "20", label: "20 ETB" },
        { value: "50", label: "50 ETB" },
        { value: "100", label: "100 ETB" },
        { value: "150", label: "150 ETB" },
        { value: "200", label: "200 ETB" },
        { value: "500", label: "500 ETB" },
    ]
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen my-8">
            {/* Left side - PinContainer */}
            <div className="flex-1 lg:flex-[1.2] flex justify-center items-center p-4  mb-8">
                <PinContainer
                    title="Tip Generously and Show Some Love"
                    className="w-[25rem] h-[20em]"
                >
                    <div className="p-4 text-black dark:text-white flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-2">Welcome!</h3>
                        <p className="mb-4 text-center">This is some description text.</p>

                        {/* Big image container */}
                        <div className="w-[25rem] h-[15rem] pb-4 rounded-lg overflow-hidden">
                            <img
                                src={newImage}
                                alt="Pin Image"
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </PinContainer>
            </div>

            {/* Right side - List */}
            <div className="flex-1 lg:flex-[0.8] flex justify-center items-center p-4">
                <fieldset className="space-y-4">
                    <legend className="text-foreground text-sm text-center leading-none font-medium">
                        Tip amount
                    </legend>
                    <RadioGroup className="grid grid-cols-3 gap-2"
                        value={selectedTip}
                        onValueChange={(val) => {
                            setSelectedTip(val);
                            setCustomTip("");
                            resetRandom();
                            setTip(parseInt(val), false);
                        }}>
                        {items.map((item) => (
                            <label
                                key={`${id}-${item.value}`}
                                className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]"
                            >
                                <RadioGroupItem
                                    id={`${id}-${item.value}`}
                                    value={item.value}
                                    className="sr-only after:absolute after:inset-0"
                                />
                                <p className="text-foreground text-sm leading-none font-medium">
                                    {item.label}
                                </p>
                            </label>
                        ))}
                    </RadioGroup>
                    <div className="*:not-first:mt-2">
                        <Label htmlFor={id}>custome amount</Label>
                        <div className="flex gap-2 flex-col">
                            <Input id={id}
                                className="flex-1"
                                placeholder="Tip me 𖹭"
                                type="number"
                                value={customTip}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setCustomTip(value);
                                    setSelectedTip("");
                                    resetRandom();
                                    setTip(value ? parseInt(value) : null, false);
                                }} />
                            <Button ref={buttonRef} variant="outline" onClick={handleTipButton} className="w-24 h-8">Tip</Button>
                        </div>
                    </div>
                </fieldset>
            </div>
            
            {/* Success Message */}
            {showMessage && tippedAmount && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="text-sm max-sm:px-3 max-sm:py-1.5 max-sm:text-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white dark:bg-transparent dark:hover:bg-accent text-white px-8 py-4 rounded-lg shadow-lg animate-in zoom-in-50 duration-300">
                        <p className="font-medium text-lg">You tipped {tippedAmount} ETB! 😎</p>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ProfileTip