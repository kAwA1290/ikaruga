'use client';

import React from 'react';
import Link from 'next/link';
import useNavigation from '@hook/use-navigation';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const SideNav = () => {
	const {
		isHomeActive,
		isReadShareActive,
		isScanActive,
		isCreatePostActive,
		isHelpActive,
	} = useNavigation();
	return (
		/*<div className="flex-col space-y-4 items-center py-8 hidden sm:flex border-r border-zinc-700 h-full w-[120px] md:w-[250px] md:items-start fixed">*/
		<div className="flex-col space-y-4 items-center py-8 hidden md:flex border-r h-full w-full md:w-[250px] md:items-start fixed">
			<Link
				href="/"
				className="flex flex-row space-x-1 items-center hover:bg-white/10 p-2 rounded-full duration-200"
			>
				<Image src="/ikaruga.svg" alt="Home" width="70" height="70" />
				<span className="text-3xl pt-0 hidden md:flex font-bold">
					Ikaruga
				</span>
			</Link>

			<Link
				href="/"
				className="flex flex-row space-x-4 space-y-4 items-center px-4 py-1 rounded-full duration-200 hover:bg-white/10 relative"
			>
				{isHomeActive ? (
					<Icon icon="mingcute:home-5-fill" width="38" height="38" />
				) : (
					<Icon icon="mingcute:home-5-line" width="38" height="38" />
				)}
				<span
					className={`text-2xl pt-0 hidden md:flex ${
						isHomeActive ? 'font-bold' : ''
					}`}
				>
					Home
				</span>
			</Link>

			<Link
				href="/read-share"
				className="flex flex-row space-x-4 items-center px-4 py-1 rounded-full duration-200 hover:bg-white/10"
			>
				{isReadShareActive ? (
					<Icon
						icon="uil:book-alt"
						width="38"
						height="38"
						className="stroke-current stroke-5"
					/>
				) : (
					<Icon icon="uil:book-alt" width="38" height="38" />
				)}
				<span
					className={`text-2xl pt-2 hidden md:flex ${
						isReadShareActive ? 'font-bold' : ''
					}`}
				>
					ReadShare
				</span>
			</Link>

			<Link
				href="/create-post"
				className="flex flex-row space-x-4 items-center px-4 py-1 rounded-full duration-200 hover:bg-white/10"
			>
				{isCreatePostActive ? (
					<Icon icon="mingcute:pen-fill" width="38" height="38" />
				) : (
					<Icon icon="mingcute:pen-line" width="38" height="38" />
				)}
				<span
					className={`text-2xl pt-2 hidden md:flex ${
						isCreatePostActive ? 'font-bold' : ''
					}`}
				>
					Shohyo
				</span>
			</Link>

			<Link
				href="/scan"
				className="flex flex-row space-x-4 items-center px-4 py-1 rounded-full duration-200 hover:bg-white/10"
			>
				{isScanActive ? (
					<Icon icon="ph:barcode-fill" width="38" height="38" />
				) : (
					<Icon icon="ph:barcode-bold" width="38" height="38" />
				)}
				<span
					className={`text-2xl pt-2 hidden md:flex ${
						isScanActive ? 'font-bold' : ''
					}`}
				>
					Scan
				</span>
			</Link>

			<Link
				href="/help"
				className="flex flex-row space-x-4 items-center px-4 py-1 rounded-full duration-200 hover:bg-white/10"
			>
				{isHelpActive ? (
					<Icon icon="gridicons:help" width="38" height="38" />
				) : (
					<Icon icon="gridicons:help-outline" width="38" height="38" />
				)}
				<span
					className={`text-2xl pt-2 hidden md:flex ${
						isHelpActive ? 'font-bold' : ''
					}`}
				>
					Help
				</span>
			</Link>
		</div>
	);
};

export default SideNav;
