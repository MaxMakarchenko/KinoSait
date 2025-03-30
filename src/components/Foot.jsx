import React from 'react';
import styled from 'styled-components';

// Создаем стилизованные компоненты
const FooterWrapper = styled.footer`
    --main-color: #ff2c1f;
    --text-color: #020307;
    --bg-color: #fff;
    background-color: var(--text-color);
    padding: 20px;
    margin-top: auto; /* Это ключевое свойство для прижатия футера */
`;

const Media = styled.div`
    display: flex;
    font-size: 20px;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const FooterText = styled.div`
    text-align: center;
    font-weight: bold;
    color: var(--bg-color);
`;

const StyledLink = styled.a`
    color: var(--bg-color);
    text-decoration: none;
    margin: 0 10px;
    transition: all 0.3s;
    display: inline-block;

    &:hover {
        color: var(--main-color);
        transform: scale(1.10);
    }
`;

const Divider = styled.div`
    height: 1px;
    background-color: #666;
    width: 100%;
`;

function Footer() {
    return (
        <>
            <Divider />
            <FooterWrapper>
                <Media>
                    <StyledLink href="https://vk.com/ksdhgdjdklaf" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-brands-vk"></i>
                    </StyledLink>
                    <StyledLink href="https://github.com/MaxMakarchenko" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-brands-github"></i>
                    </StyledLink>
                    <StyledLink href="https://web.telegram.org/k/#@Traxnimenypojaluista" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-brands-telegram"></i>
                    </StyledLink>
                    <StyledLink href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-brands-youtube"></i>
                    </StyledLink>
                    <StyledLink href="https://www.codewars.com/users/MAksssimka228" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-brands-js"></i>
                    </StyledLink>
                </Media>
                <FooterText>
                    <p>Мы всегда готовы вам помочь.</p>
                    <StyledLink href="#">Задать вопрос</StyledLink>
                </FooterText>
            </FooterWrapper>
        </>
    );
}

export default Footer;

