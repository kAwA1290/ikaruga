'use client';

import React from 'react';
import { useState, useEffect } from "react";
import BookReview from "@components/read-share/book-review";
import review_test from "@data/review_test.json";

interface review_type {
	id: string;
	title: string;
	isbn: string;
	essay: string;
}

const ReadShare = () => {
	const [page, setPage] = useState<number>(1);
	const maxKeywordLength = 100;
	const [keywordLength, setKeywordLength] = useState<number>(0);
	const [searchAble, setSearchAble] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [reviewData, setReviewData] = useState<{ id: string; title: string; isbn: string; essay: string; }[]>([]);
	const [nextExist, setNextExist] = useState<boolean>(false);
	const [previousExist, setPreviousExist] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [maxPage, setMaxPage] = useState<number>(0);


	const loadData = async () => {
		if (process.env.NEXT_PUBLIC_POSTGRES_ENABLE === "false") {
			console.warn('postgres is disabled....')
				setReviewData(review_test as review_type[]);
			return ;
		}
		setLoading(true);
		try {
			(async () => {
			const res = await fetch('/api/get_shohyo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					page,
					keyword,
				}),
			});
			await res.json().then((resJson) => {
				setReviewData(resJson.data);
				setMaxPage(resJson.maxPage);
			});
			isPageExist();
			})();
		} catch (err) {
			console.error(err);
		};
		setLoading(false);
	};

	const handleOnSearch = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setPage(1);
		loadData();
		setSearchAble(false);
	};

	const handleOnChangeKeyword = (
		ev: React.ChangeEvent<HTMLInputElement>
		) => {
		setKeyword(ev.target.value);
		setKeywordLength(ev.target.value.length);
		setSearchAble(true);
	};

	const isPageExist = () => {
		if (page > 1) {
			console.log('previous exist');
			setPreviousExist(true);
		} else {
			setPreviousExist(false);
		}
		if (page < maxPage) {
			console.log('next exist');
			setNextExist(true);
		} else {
			setNextExist(false);
		}
		console.log('maxPage: ', maxPage);
	}

	const handleOnClickPrevious = () => {
		setPage(page - 1);
		loadData();
	}

	const handleOnClickNext = () => {
		setPage(page + 1);
		loadData();
	}

	return (
		/*<div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">*/
		/*<label htmlFor="search" className="block text-2xl font-bold text-gray-700 mb-2">検索</label>*/
		<div className="flex flex-col pt-4 ml-4 sm:ml-[120px] md:ml-[280px] pb-0 min-h-screen">
			<span className="px-8 mt-10 font-bold text-3xl">ReadShare</span>
			<form onSubmit={handleOnSearch} className="px-8 py-6 w-full">
				<div className="mb-6">
					<input
					type="text"
					id="search"
					value={keyword}
					maxLength={maxKeywordLength}
					onChange={handleOnChangeKeyword}
					className="w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					/>
				</div>
				<button
				type="submit"
				disabled={!searchAble}
				//className={"w-full py-4 rounded-md text-white text-xl bg-blue-500 hover:bg-blue-600"}
				className={`w-full py-4 rounded-md text-white text-xl ${ searchAble ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
				>
				{keywordLength != 0 ? '本を検索' : '本を検索'}
				</button>
			</form>
			<div className="w-full">
				{ loading ? (
					<div className="flex justify-center">
						<div className="animate-spin mb-10 h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
					</div>
				) : null }
				{reviewData.map((data, index) => (
						<BookReview key={index} shohyo={data} />
				))}
			</div>
			<div className="flex justify-center mt-10">
				<button onClick={handleOnClickPrevious} disabled={!previousExist} className={`w-full py-4 my-4 mx-4 rounded-md text-white text-xl ${ previousExist ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}>
					前のページ
				</button>
				<button onClick={handleOnClickNext} disabled={!nextExist} className={`w-full py-4 my-4 mx-4 rounded-md text-white text-xl ${ nextExist ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}>
					次のページ
				</button>
			</div>
		</div>
	)
}

export default ReadShare;
