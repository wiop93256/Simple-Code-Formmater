import xmlFormatter from 'xml-formatter';

export default function formatCode(code) {
    return xmlFormatter(code);
}