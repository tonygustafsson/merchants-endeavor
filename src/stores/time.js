import { readable, derived } from 'svelte/store';
import { ticker } from './ticker.js';
import moment from 'moment';

const startDate = '1660-01-01T08:00:00';
const ticksPerHour = 6;

const timeStore = derived(ticker, $ticks => {
    // Calculate time where one hour is sixth seconds after the first date
    // One month is approx 72 minutes
    return {
        now: moment(startDate)
            .add($ticks / ticksPerHour, 'hours')
            .format('dddd, MMMM Do YYYY'),
        realTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        sinceStart: moment(startDate).from(moment(startDate).add($ticks / ticksPerHour, 'hours'))
    };
});

export const time = timeStore;
