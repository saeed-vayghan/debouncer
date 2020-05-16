// setup debounce reference
const debounce = require('./index')

const BOUNCE_INTERVAL = 1000
const BOUNCE_LIMIT    = 5



async function trigger () {
  console.log('This is the args:', arguments)
}

// You can pass any kind of arguments to the trigger to be bounced with simple-debouncer.
const my_simple_debouncer = debounce.simple(BOUNCE_INTERVAL, trigger)

my_simple_debouncer('key_custom') // trigger will not be processed
my_simple_debouncer({ key: 'key_read' }) // trigger will not be processed
my_simple_debouncer([{ key: 'val' }]) // trigger will not be processed
my_simple_debouncer('key_x') // Output ==> This is the args: [Arguments] { '0': { key: 'key_read' } }




async function trigger (key) {
  console.log('This is the timer-key:', key)
}

// You can group each series of tiggers with a same key to be bounced during a specific interval with timer-debouncer.
const my_timer_debouncer = debounce.timer(BOUNCE_INTERVAL, trigger)

my_timer_debouncer('key_1') // trigger will not be processed
my_timer_debouncer('key_1') // This is the timer-key: key_1

my_timer_debouncer('key_2') // trigger will not be processed
my_timer_debouncer('key_2') // Output ==> This is the timer-key: key_2




async function trigger (key) {
  console.log('This is the counter-key:', key)
}

// You can group each series of tiggers with a same key to be bounced during over the specific limit with counter-debouncer.
const my_counter_debouncer = debounce.counter(BOUNCE_LIMIT, trigger)

my_counter_debouncer('my_key') // 1th, trigger will not be processed
my_counter_debouncer('my_key') // 2th, trigger will not be processed
my_counter_debouncer('my_key') // 3th, waite several seconds, trigger will not be processed
my_counter_debouncer('my_key') // 4th, trigger will not be processed
my_counter_debouncer('my_key') // 5th, Output ==> This is the counter-key: my_key




async function trigger (key) {
  console.log('This is the mixed-key:', key)
}

// You can group each series of tiggers with a same key to be bounced over the mixed circumstances with mixed-debouncer.
const my_mixed_debouncer = debounce.mixed(BOUNCE_INTERVAL, BOUNCE_LIMIT, trigger)

my_mixed_debouncer('my_key') // 1th, trigger will not be processed
my_mixed_debouncer('my_key') // 2th, trigger will not be processed
my_mixed_debouncer('my_key') // 3th, waite a few seconds, Output ==> This is the mixed-key: my_key and counter will be reset
my_mixed_debouncer('my_key') // 1th, trigger will not be processed
my_mixed_debouncer('my_key') // 2th, trigger will not be processed
my_mixed_debouncer('my_key') // 3th, trigger will not be processed
my_mixed_debouncer('my_key') // 4th, trigger will not be processed
my_mixed_debouncer('my_key') // 5th, Output ==> This is the mixed-key: my_key





async function trigger (key, func) {
  console.log('Trigger:', key)
  console.log('Executeing func...')
  await func()

  return 
}

// You can group each series of customized-tiggers with a same key to be bounced over the mixed circumstances with convoy-debouncer.
const my_convoy_debouncer = debounce.convoy(BOUNCE_INTERVAL, BOUNCE_LIMIT, trigger)

const my_promise = async function() {
  await new Promise((res) => setTimeout(res, 3000))
  console.log('Promise is executed.')
}

my_convoy_debouncer('key_1', my_promise) // 1th, trigger will not be processed
my_convoy_debouncer('key_1', my_promise) // 2th, trigger will not be processed
my_convoy_debouncer('key_1', my_promise) // 3th, trigger will not be processed
my_convoy_debouncer('key_1', my_promise) // 4th, trigger will not be processed
my_convoy_debouncer('key_1', my_promise)
/*
  Output ==>
    rigger: key_1
    Executeing func...
    Promise is executed.
*/