import React from 'react';
import styled from 'styled-components';

// Создаем стилизованные компоненты
const Root = styled.div`
    --main-color: #ff2c1f;
    --text-color: #020307;
    --bg-color: #fff;
`;
const Container = styled.div`
    background-color: var(--text-color);
    padding: 20px;
`;

const FooterElement = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
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
`;
const StyledLink = styled.a`
    color: var(--bg-color);
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s;

    &:hover {
        color: var(--main-color);
        transform: scale(1.10);
    }
`;
const Divider = styled.div`
    height: 1px; /* Высота разделительной полосы */
    background-color: #666; /* Цвет разделительной полосы */
`;
function Footer() {
    return (
        <>
            <Divider />
            <Container>
                <FooterElement>
                <Media>
                        <StyledLink href="https://vk.com/ksdhgdjdklaf" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-brands-vk"></i>
                        </StyledLink>
                        <StyledLink href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-brands-github"></i>
                        </StyledLink>
                        <StyledLink href="https://web.telegram.org/k/#@Traxnimenypojaluista" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-brands-telegram"></i>
                        </StyledLink>
                        <StyledLink href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-brands-youtube"></i>
                        </StyledLink>
                        <StyledLink href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-brands-js"></i>
                        </StyledLink>
                    </Media>
                    <FooterText>
                        <p>Мы всегда готовы вам помочь.</p>
                        <StyledLink href="#">Задать вопрос</StyledLink>
                    </FooterText>
                </FooterElement>
            </Container>
        </>
    );
}

export default Footer;

