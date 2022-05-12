import _get from 'lodash/get';
import _replace from 'lodash/replace';
const cleanValueRegex = /(")/g;

function fieldExtractor(rowData, columnIndex) {
    const rowFieldValue = _get(rowData, `[${columnIndex}]`);
    return _replace(rowFieldValue, cleanValueRegex, '')
}

export default fieldExtractor;
