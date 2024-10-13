"use client";

import { useState } from "react";
import "../app/globals.css";

export default function Home() {
  const[articles, setArticles] = useState([]);
  const[query, setQuery] = useState('');

  const fetchArticles = async () => {
    try {
      const res = await fetch(`/api/nyt?query=${query}`);
      const data = await res.json();
      setArticles(data.response.docs);
    } catch (error) {
      console.log('Error fetching the articles', error);
    }
  };


  return (
      <div className="mb-5 flex flex-col w-full items-center justify-between">
        <h1 className="prose text-2xl my-8 font-bold dark:prose-invert xl:text-3xl">Search articles from the NYTimes</h1>
        <input
          type="text"
          className="bg-black border border-indigo-600 text-white px-4 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Make your search..."
        />
        <label className="relative block">
          <button
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md mt-4 mb-4 py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          onClick={fetchArticles}
        >Click to search</button>
        </label>

        <article className="text-pretty">
          {articles.map((article) => (
            <div key={article._id} className="border border-indigo-600 mb-2 p-4">
              <h2 className="font-sans text-lg my-2">{article.headline.main}</h2>
              <p className="font-sans mb-3 text-base/7 text-zinc-600 dark:text-zinc-400 xl:text-base">{article.snippet}</p>
              <a href="{article.web_url}" target="_blank" rel="nooponer noreferrer">Read more!</a>
            </div>
        ))}
      </article>
    </div>
  );
}

