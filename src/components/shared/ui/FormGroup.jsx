import React from "react";
import TextInput from "./TextInput";
import { FaCircleCheck } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import SelectInput from "./SelectInput";
const FormGroup = ({
    inputStyle,
    labelStyle,
    containerStyle,
    placeholder,
    type,
    onChange,
    value,
    id,
    name,
    label,
    error,
    children,
    validate,
}) => {
    return (
        <div className={`flex flex-col gap-2 ${containerStyle}`}>
            <div className="flex justify-between items-center">
                <label
                    className={`text-white-base text-sm font-body font-normal ${labelStyle}`}
                    htmlFor={id}
                >
                    {label}
                </label>
                {validate && (
                    <div className="flex justify-end w-[60%] items-center gap-1">
                        {!error && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                            >
                                <FaCircleCheck
                                    size={18}
                                    className="text-green-500"
                                />
                            </motion.div>
                        )}
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`text-white-base/70 text-xs font-body font-normal transition-all duration-300`}
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
            {type === "select" && type !== "date" ? (
                <SelectInput
                    onChange={onChange}
                    value={value}
                    name={name}
                    id={id}
                    className={inputStyle}
                >
                    {children}
                </SelectInput>
            ) : (
                <TextInput
                    onChange={onChange}
                    value={value}
                    name={name}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={inputStyle}
                />
            )}
        </div>
    );
};

export default FormGroup;
