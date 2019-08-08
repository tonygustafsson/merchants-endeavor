import { readable, derived } from 'svelte/store';
import { ticker } from './ticker.js';
import moment from 'moment';

const startDate = '1721-01-01';

export const time = derived(ticker, $time => {
    // Calculate time where one hour is six seconds after the first date
    // One year is approx 24 minutes
    return moment(startDate)
        .add($time / 6, 'hours')
        .format('dddd, MMMM Do YYYY h:00 a');
});
