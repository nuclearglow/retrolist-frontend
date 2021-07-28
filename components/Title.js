import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { QUERY_LIST_BY_ID } from './List';

const TitleStyles = styled.div`
    grid-area: header;
    position: fixed;
    left: 30%;
    transform: translateX(-30%);

    .wrapper {
        position: relative;
        text-align: left;

        .title {
            text-transform: uppercase;
            background-image: linear-gradient(
                #378dbc 0%,
                #b6e8f1 46%,
                #ffffff 50%,
                #32120e 54%,
                #ffc488 58%,
                #582c11 90%,
                #ec9b4e 100%
            );
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;

            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 2px #f5f5f5;

            font-size: calc(var(--global-scale-factor) * 100px);
            font-family: 'Titillium Web', sans-serif;
            font-style: italic;
            line-height: 1;
            padding-right: calc(var(--global-scale-factor) * 20px);

            &:before {
                content: attr(data-title);
                position: absolute;
                left: 0;
                top: 0;
                padding-right: calc(var(--global-scale-factor) * 150px);

                z-index: 10;

                background-image: -webkit-linear-gradient(
                    -40deg,
                    transparent 0%,
                    transparent 40%,
                    #fff 50%,
                    transparent 60%,
                    transparent 100%
                );
                background-position: calc(var(--global-scale-factor) * -340px) 0;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-stroke: 0;

                animation-name: chrome-effect;
                -webkit-animation-name: chrome-effect;
                animation-duration: calc(1 / var(--global-scale-factor) * 6s);
                -webkit-animation-duration: calc(
                    1 / var(--global-scale-factor) * 6s
                );
                animation-delay: 2s;
                -webkit-animation-delay: 2s;
                animation-timing-function: linear;
                -webkit-animation-timing-function: linear;
                animation-iteration-count: infinite;
                -webkit-animation-iteration-count: infinite;
            }

            .subtitle {
                position: absolute;
                top: calc(var(--global-scale-factor) * 50px);
                right: calc(var(--global-scale-factor) * -30px);

                font-family: 'Mr Dafoe', cursive;
                font-size: calc(var(--global-scale-factor) * 80px);
                text-transform: none;
                &::first-letter {
                    text-transform: uppercase;
                }

                color: var(--subtitle-color);
                -webkit-text-fill-color: var(--subtitle-color);

                transform: rotate(-15deg);
                -webkit-transform: rotate(-15deg); /* Safari and Chrome */
                -webkit-text-stroke: 1px #f008b7;
                -webkit-filter: drop-shadow(
                    1px 1px calc(var(--global-scale-factor) * 10px) #f008b7
                );
                filter: drop-shadow(
                    1px 1px calc(var(--global-scale-factor) * 10px) #f008b7
                );
                z-index: 20;
            }
        }
    }
`;

const Title = () => {
    const { query } = useRouter();
    const { data, loading, error } = useQuery(QUERY_LIST_BY_ID, {
        variables: { id: query?.id },
    });

    if (loading) {
        return null;
    }

    const title = data?.List?.title ?? 'Retro';
    const subtitle = data?.List?.subtitle ?? 'List';

    return (
        <TitleStyles>
            <div className="wrapper">
                <div className="title">
                    {title}
                    <div className="subtitle">{subtitle}</div>
                </div>
                <div className="scanline" />
            </div>
        </TitleStyles>
    );
};

export default Title;
