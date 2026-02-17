import { useState } from "react";
import toast from "react-hot-toast";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/chat/useSendMessage";
import { useI18n } from "../../hooks/useI18n";

const SendMessageContainer = ({ inputRef, fetchMessages, currentChat, scrollToBottom }) => {
	const { t } = useI18n();
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { mutateAsync: sendMessage } = useSendMessage();
	const handleSendMessage = async (e) => {
		e.preventDefault();
		const trimmedInput = input.trim();
		if (!trimmedInput) return;
		setIsLoading(true);
		try {
			setInput("");
			await sendMessage({
				chatId: currentChat.friend.id,
				message: trimmedInput,
			})
				.then(() => {
					fetchMessages();
				})
				.then(() => {
					setTimeout(() => scrollToBottom(), 2000);
				});
		} catch (err) {
			toast.error(err?.response?.data?.message || t("messages.failedToSendMessage"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full border-t-thin border-white-base pt-3">
			<form
				onSubmit={handleSendMessage}
				className="flex items-center gap-4"
			>
				<div className="flex items-center grow px-[15px] py-[11px] rounded-[19px] bg-[#EFF6FCDE]">
					<button
						type="button"
						className="hover:opacity-70 transition-opacity"
					>
						<GrAttachment size={22} />
					</button>
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder={t("messages.typeYourMessage")}
						className="grow text-black bg-transparent border-none outline-none mx-[20px]"
						disabled={isLoading}
					/>
				</div>
				<button
					type="submit"
					disabled={!input.trim()}
					className="bg-blue-primary rounded-[14px] p-3 cursor-pointer disabled:bg-slate-500 duration-300 hover:opacity-90"
				>
					<IoSend
						className="text-white-base"
						size={25}
					/>
				</button>
			</form>
		</div>
	);
};

export default SendMessageContainer;
