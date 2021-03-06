import type { GetStaticProps } from 'next';
import Head from 'next/head';

import SvgSprite from 'components/SvgSprite';

type Props = {
  skills: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const skills = ['html', 'css', 'sass', 'tailwindcss', 'js', 'ts', 'react', 'redux', 'nextjs', 'git'];

  return {
    props: { skills },
  };
};

export default function Home({ skills }: Props) {
  return (
    <main>
      <Head>
        <title>Xuan&apos;s website</title>
        <meta name="description" content="Xuan的個人網站,部落格和作品集" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-32 px-5">
        <h1 className="text-center font-serif text-8xl capitalize 2xl:text-6xl xl:text-4xl">A front-end developer</h1>
      </header>

      <section className="py-8 px-20 dark:bg-dark-700 2xl:px-10 xl:px-5">
        <h2 className="mb-4 text-3xl font-semibold xl:text-xl">Skills</h2>
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
}
