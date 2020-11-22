import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import dev from 'assets/illustrations/skills.svg';
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const Skills = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
        <Thumbnail>
          <img src={dev} alt="I’m John and I’m a Backend & Devops engineer!" />
        </Thumbnail>
        <Details theme={theme}>
          <h1>Sobre mim</h1>
          <p>
            Bacharel em Sistemas de Informação e apaixonado por tecnologia, há mais de cinco anos atuando com
            Desenvolvimento Web.
            <br />
            <br />
            Especialista nas linguagens de programação JavaScript e PHP, bancos de dados MySQL, PostgreSQL e MongoDB e
            tecnologias como ReactJS, NodeJS e Laravel.
          </p>
          <Button as={AnchorLink} href="#contact">
            Contacte-me
          </Button>
        </Details>
      </SkillsWrapper>
    </Wrapper>
  );
};
