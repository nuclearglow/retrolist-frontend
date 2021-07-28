import styled from 'styled-components';

const ScanlineStyles = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${(props) =>
        props.scanlineHeight ? `${props.scanlineHeight}em` : '1em'};
    opacity: 0.1;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(255, 250, 250, 1) 50%,
        rgba(100, 255, 100, 1) 50%,
        transparent 100%
    );
    animation: scanline
        ${(props) => (props.scanlineSpeed ? `${props.scanlineSpeed}s` : '16s')}
        ease-in-out infinite;
    pointer-events: none;
`;

const Scanline = () => {
    const scanlineHeight = 1;
    const scanlineSpeed = 16;

    return <ScanlineStyles />;
};

export default Scanline;
