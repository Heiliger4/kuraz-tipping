import { PinContainer } from "../components/ui/3d-pin"
import newImage from "@/assets/new.jpg";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useId, useRef, memo } from "react"
import { useAppStore } from "@/store/appStore";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const ProfileTip = memo(() => {
    // Optimized selectors - only subscribe to needed state slices
    const tip = useAppStore((state) => state.tip)
    const notification = useAppStore((state) => state.notification)
    const setSelectedTip = useAppStore((state) => state.setSelectedTip)
    const setCustomTip = useAppStore((state) => state.setCustomTip)
    const submitTip = useAppStore((state) => state.submitTip)

    const id = useId();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleTipButton = () => {
        submitTip(buttonRef);
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
                        value={tip.selectedTip}
                        onValueChange={(val) => {
                            setSelectedTip(val);
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
                                value={tip.customTip}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setCustomTip(value);
                                }} />
                            <Button ref={buttonRef} variant="outline" onClick={handleTipButton} className="w-24 h-8">Tip</Button>
                        </div>
                    </div>
                </fieldset>
            </div>
            
            {/* Success Message */}
            {notification.show && notification.type === 'tip' && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="text-sm max-sm:px-3 max-sm:py-1.5 max-sm:text-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white dark:bg-transparent dark:hover:bg-accent text-white px-8 py-4 rounded-lg shadow-lg animate-in zoom-in-50 duration-300">
                        <p className="font-medium text-lg">{notification.message}</p>
                    </div>
                </div>
            )}
        </div>

    )
})

ProfileTip.displayName = 'ProfileTip'

export default ProfileTip