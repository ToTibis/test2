import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);

const Example = () => {
	const symbols = ['1', '2', '3', 'Go!'];
	const [bgColor, setBgColor] = useState('');
	const tl = useRef(null);
	const textRef = useRef(null);

	useEffect(() => {
		textRef.current.innerHTML = symbols[symbols.length - 1];
		tl.current = gsap.timeline({
			repeat: -1,
			repeatDelay: 1.5,
			paused: true,
		});

		symbols.forEach((s, i) => {
			tl.current.to(textRef.current, {
				duration: 0.5,
				onComplete() {
					textRef.current.innerHTML = s;
				},
			});
		});
	}, []);

	const handleMouseEnter = () => {
		setBgColor('var(--secondary-color)');
		if (!tl.current.isActive()) tl.current?.play();
	};

	const handleMouseLeave = () => setBgColor('');

	return (
		<div className={styles.root} style={{ backgroundColor: bgColor }}>
			<svg
				className={styles.figure}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 500 500'
			>
				<clipPath id='rectangle-clip'>
					<path
						transform='rotate(-45)'
						d='M -177.14287,178.57143 H -1.5e-5 C 60.122067,236.54897 118.58076,296.17572 177.14284,355.71428 v 177.14285 h -354.28571 z'
					/>
				</clipPath>

				<path
					transform='rotate(-45)'
					d='M -177.14287,178.57143 H -1.5e-5 C 60.122067,236.54897 118.58076,296.17572 177.14284,355.71428 v 177.14285 h -354.28571 z'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className={styles.rectangle}
				/>
				<text
					style={{
						fontFamily: 'Georgia',
						lineHeight: 1.25,
					}}
					x={'50%'}
					y={'60%'}
					dominantBaseline='middle'
					textAnchor='middle'
					className={styles.text}
					ref={textRef}
					clipPath='url(#rectangle-clip)'
				></text>
			</svg>
		</div>
	);
};

export default Example;
