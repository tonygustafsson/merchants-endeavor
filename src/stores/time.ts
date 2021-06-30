import { derived } from 'svelte/store';
import { ticker } from './ticker';
import moment from 'moment';
import { startDate, ticksPerHour, dateFormat, dateSpecificFormat } from '../constants/time';

const timeStore = derived(ticker, $ticks => {
	// Calculate time where one hour is sixth seconds after the first date
	// One month is approx 72 minutes
	return {
		now: moment(startDate)
			.add($ticks / ticksPerHour, 'hours')
			.format(dateFormat),
		realTime: moment().format(dateSpecificFormat),
		sinceStart: moment(startDate).from(moment(startDate).add($ticks / ticksPerHour, 'hours')),
		getTimeAtTick: tick =>
			moment(startDate)
				.add(tick / ticksPerHour, 'hours')
				.format(dateFormat)
	};
});

export const time = timeStore;
