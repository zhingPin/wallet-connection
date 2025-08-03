"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import styles from "./submitBtn.module.css";
import { useChat } from "@/(context)/useContext/chatContext";

const SubmitBtn: React.FC = () => {
    const { isLoading } = useChat();
    const { pending } = useFormStatus();

    // Disable the button if either React form is pending or manual loading state is true
    const disabled = pending || isLoading;

    return (
        <button
            type="submit"
            className={styles.sendButton}
            disabled={disabled}
            aria-busy={disabled} // improves accessibility: screen readers know button is busy
        >
            {disabled ? "Sending..." : "Send"}
        </button>
    );
};

export default SubmitBtn;
