import { useState } from "react";
import data from "./data";
import "./style.css";

export const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSingleSelection = (currentId) => {
        setSelected(currentId === selected ? null : currentId);
    };

    const handleMultiSelection = (currentId) => {
        const cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(currentId);
       
        if (findIndexOfCurrentId === -1) {
            cpyMultiple.push(currentId);
        }
        else{
            cpyMultiple.splice(findIndexOfCurrentId, 1);
        }
        setMultiple(cpyMultiple);
    };

    console.log(selected, multiple);

    return (
        <div className="wrapper">
            {enableMultiSelection ? (
                <button
                    onClick={() =>
                        setEnableMultiSelection(!enableMultiSelection)
                    }
                >
                    Disable Multi Selection
                </button>
            ) : (
                <button
                    onClick={() =>
                        setEnableMultiSelection(!enableMultiSelection)
                    }
                >
                    Enable Multi Selection
                </button>
            )}

            <div className="accordion">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div
                            onClick={
                                enableMultiSelection
                                    ? () => handleMultiSelection(dataItem.id)
                                    : () => handleSingleSelection(dataItem.id)
                            }
                            key={dataItem.id}
                            className="item"
                        >
                            <div className="title">
                                <h3>{dataItem.question}</h3>
                                {selected === dataItem.id ? (
                                    <span>-</span>
                                ) : (
                                    <span>+</span>
                                )}
                            </div>
                            {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                                <p className="content">{dataItem.answer}</p>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div>Data not found</div>
                )}
            </div>
        </div>
    );
};
