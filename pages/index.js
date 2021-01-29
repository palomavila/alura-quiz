import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import Button from "../src/components/Button";
import Input from "../src/components/Input";
import QuizContainer from "../src/components/QuizContainer";
import Link from "../src/components/Link";

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz Riverdale</title>
        <meta name="title" content="Quiz Riverdale" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://alura-quiz-delta.vercel.app/"
        />
        <meta property="og:title" content="D" />

        <meta
          property="og:image"
          content="https://pbs.twimg.com/media/CwdKTpcXgAEY3s4.jpg"
        />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transiton={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" }
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz Riverdale</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={function (e) {
                e.preventDefault();
                router.push(`/quiz?name=${name}`);
                console.log("Fazendo uma submissão por meio do React");
              }}
            >
              <Input
                name="NomeDoUsuario"
                onChange={(e) => setName(e.target.value)}
                placeholder="Diz ai seu nome"
                value="name"
              />

              <Button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          s
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>

          <Widget.Content>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");
                return (
                  <li>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transiton={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" }
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/palomavila" />
    </QuizBackground>
  );
}
