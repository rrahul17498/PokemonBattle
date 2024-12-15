import APP_ROUTES from "@/app/routing/routes";
import Button from "@/components/base/button";
import { useNavigate } from "react-router-dom";
import { FeedbackTypes } from "../data/models";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface BattleCompletedDialogProps {
    isUserWinner: boolean
}

const feedbackTextAreaPlaceHolder = {
    [FeedbackTypes.GOOD]: "How can we improve ?",
    [FeedbackTypes.BAD]: "Please let us know what happened ?",
    default: "How was your experience ?"
}

const BattleCompletedDialog = ({ isUserWinner }: BattleCompletedDialogProps) => {

    const navigate = useNavigate();
    const [selectedFeedbackType, setSelectedFeedbackType] = useState<FeedbackTypes | null>(null);


    const onGoToAnotherBattle = () => {
        navigate(APP_ROUTES.protected.connectBattle.fullPath, { replace: true });
    };

    const onExitBrowserWindow = () => {
        window.close();
    };

    const onSelectFeedbackEmoji = (feedbackType: FeedbackTypes) => () => {
        setSelectedFeedbackType(feedbackType);
    }

    return (
        <dialog className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 pt-10 rounded-lg w-96" open={true}>
            {isUserWinner ? <p className="text-center text-lg font-semibold text-teal-700">You won the Battle !</p> : <p className="text-center text-lg font-semibold text-primary">You lost the Battle !</p>} 
            <div className="mt-4">
                <h3 className="font-medium text-center text-lg mt-4">Feedback</h3>
                <div className="flex justify-center my-6">
                    <span className={cn("text-6xl mx-5 cursor-pointer rounded border border-white", { "border-teal-400 bg-teal-200": selectedFeedbackType == FeedbackTypes.GOOD })} onClick={onSelectFeedbackEmoji(FeedbackTypes.GOOD)}>😊</span>
                    <span className={cn("text-6xl mx-5 cursor-pointer rounded border border-white", { "border-primary bg-primary-light": selectedFeedbackType == FeedbackTypes.BAD })} onClick={onSelectFeedbackEmoji(FeedbackTypes.BAD)}>🙁</span>
                </div>
            </div>
            <textarea
                id="feedback_window"
                name="feedback_window"
                rows={2} 
                className="border-slate-400 border rounded p-2 w-full text-sm outline-none" 
                placeholder={selectedFeedbackType ? feedbackTextAreaPlaceHolder[selectedFeedbackType] : feedbackTextAreaPlaceHolder["default"]}
                ></textarea>
            <div className="flex justify-around mt-4">
                <Button name={"go_to_battle"} onClick={onGoToAnotherBattle}>Go for another Battle</Button>
                <Button name={"go_to_battle"} onClick={onExitBrowserWindow}>Exit game</Button>
            </div>
        </dialog>
    );
};

export default BattleCompletedDialog;