import sqlFormatter from 'sqlformatter';

export default function formatCode(code) {

    return sqlFormatter.format(code);
}