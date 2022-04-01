import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import SvgSprite from 'components/SvgSprite';

type Props = {
  skills: string[];
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const skills = ['html', 'css', 'sass', 'tailwindcss', 'js', 'ts', 'react', 'redux', 'nextjs', 'git'];

  return {
    props: { skills },
  };
};

const Home: NextPage<Props> = ({ skills }) => {
  return (
    <main>
      <Head>
        <title>Xuan&apos;s website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-32">
        <h1 className="text-center font-serif text-8xl capitalize 2xl:text-6xl xl:text-4xl">A front-end developer</h1>
      </header>

      <section className="py-4">
        <h2 className="mb-10 text-3xl font-semibold xl:text-xl">Skills</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {skills.map(skill => {
            return (
              <SvgSprite
                key={skill}
                category="skill"
                symbolId={`${skill}`}
                className="h-20 w-20 transition-transform hover:scale-125"
              >
                <title>{skill}</title>
              </SvgSprite>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
