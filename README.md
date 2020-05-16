# my-debouncer
Yet another debouncer

### Debounce: as long as it continues to be invoked, it will not be triggered or will be under specifi circumstances

### Throttle: as long as it continues to be invoked, raise on every interval

## Installation
Install via NPM:

```bash
npm install my-debouncer

```

## Usage

#### javascript

```javascript

// You can pass any kind of arguments to the trigger to be bounced with simple-debouncer.
const my_simple_debouncer = debounce.simple(BOUNCE_INTERVAL, trigger)

// You can group each series of tiggers with a same key to be bounced during a specific interval with timer-debouncer.
const my_timer_debouncer = debounce.timer(BOUNCE_INTERVAL, trigger)

// You can group each series of tiggers with a same key to be bounced during over the specific limit with counter-debouncer.
const my_counter_debouncer = debounce.counter(BOUNCE_LIMIT, trigger)

// You can group each series of tiggers with a same key to be bounced over the mixed circumstances with mixed-debouncer.
const my_mixed_debouncer = debounce.mixed(BOUNCE_INTERVAL, BOUNCE_LIMIT, trigger)

// You can group each series of customized-tiggers with a same key to be bounced over the mixed circumstances with convoy-debouncer.
const my_convoy_debouncer = debounce.convoy(BOUNCE_INTERVAL, BOUNCE_LIMIT, trigger)


```

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).