import { v4 as uuidv4 } from 'uuid';
import InputNumber from '@shared/InputNumber/InputNumber';
import Localization from '@localization/components/runRule/rollDice';
import React, { useState } from 'react';
import styles from '@css/runRule/rollDice/RollDice.module.scss';

const RollDice: React.FC = () => {
    Localization.setLanguage(navigator.language);
    const [multiplier, setMultiplier] = useState<number>(1);
    const [result, setResult] = useState<number>(1);
    const dice = [4, 6, 8, 10, 12, 20];

    const calculateTotal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { value } = e.currentTarget;
        let counter = 0;
        const random = () => Math.floor(Math.random() * +value) + 1;
        for (let i = 0; i < multiplier; i += 1) {
            counter += random();
        }
        setResult(counter);
    };

    const renderDice = () => {
        const toRender = [];
        for (let i = 0; i < dice.length; i += 1) {
            toRender.push(
                <button value={dice[i]} key={uuidv4()} type="button" onClick={calculateTotal}>
                    D
                    {dice[i]}
                </button>,
            );
        }
        return toRender;
    };

    return (
        <div className={styles.container}>
            <div className={styles.text}>{Localization.numberDice}</div>
            <div className={styles.multiplier}>
                <InputNumber
                    id={uuidv4()}
                    value={multiplier}
                    onInputData={(value: number) => { setMultiplier(value); }}
                />
            </div>
            <div className={styles.text}>{Localization.typeDice}</div>
            <div className={styles.dice}>
                {renderDice()}
            </div>
            <div className={styles.results}>
                <h1>&#x2193;</h1>
                <div className={styles.text}>{Localization.result}</div>
                <p className={styles.box}>{result}</p>
            </div>
        </div>
    );
};

export default RollDice;
