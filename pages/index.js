import Head from 'next/head'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const moviesFile = path.join(process.cwd(), 'public', 'movies.json')
  const resp = fs.readFileSync(moviesFile);
  const movies = JSON.parse(resp);
  return {
    props: {
      movies
    }
  }
}

export default function Home({ movies }) {
  return (
    <div className="container">
      <Head>
        <title>Movie Night</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="splash">
        <h1 className="title">
          Movie Night
        </h1>

        <p className="description">
          What movie are we seeing tonight?
        </p>
      </div>

      <main>
        {movies.map((movie, i) => {
          const date = new Date(movie.day);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          return <div className="movie" key={i}>
            <div className="movie-day">
              <span>{date.toLocaleDateString("en-US", options)}</span>
            </div>
            <div className="movie-title">{movie.name}</div>
            <img className="movie-image" src={movie.image} />
          </div>
        })}
      </main>

      <footer>
        Made with Love by
          <img src="/bunny.svg" alt="Bunny Logo" className="logo" />&nbsp;&nbsp;Bunny
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }

        .splash {          
          background: url('/splash.jpg') no-repeat center center;
          background-size: cover;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 40vh;
          opacity: 90%;
        }

        main {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
          flex-wrap: wrap;
          position: relative;
        }

        .movie {
          padding: 2rem 0;
          position: relative;
        }

        .movie-title {
          position: absolute;
          background: rgba(0,0,0,0.7);
          bottom: 1rem;
          font-size: 2.5rem;
          padding: 0.3rem 1rem 0.3rem 2rem;
          text-shadow: 0px 0px 5px #000000;
          color: #ffffff;
        }

        .movie-image {
          width: 100%;
          height: 13rem;
          object-fit: cover;
          margin-top: -0.8rem;
        }

        .movie-day {
          text-align: right;
        }

        .movie-day span {
          display: inline-block;
          padding: 0.5rem 1rem 0.5rem 2rem;
          background-color: #822453;
          color: #FFFFFF;
          font-size: 2rem;
          position: relative;
          z-index: 1;
          opacity: 0.9;
          box-shadow: -1px 1px 2px 1px rgba(0,0,0,0.4);
        }

        .movie:nth-child(odd) .movie-day span {
          background-color: #577622;
        }

        footer {
          width: 100%;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #F0F0F0;
          margin-bottom: -1px;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 5rem;
          color: #ffffff;
          opacity: 88%;
        }

        .title,
        .description {
          text-align: center;
          text-shadow: 0px 1px 3px #000000;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          color: #ffffff;
        }

        .logo {
          height: 60px;
          margin-top: -10px;
        }

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Trebuchet MS", Helvetica, sans-serif;
        }

        body {
          background: #101010;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
