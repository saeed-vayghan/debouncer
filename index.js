const simple = (interval, trigger) => {
  let timeout

  return (...arguments) => {
    const context = this
    const args    = arguments

    clearTimeout(timeout)

    timeout = setTimeout(() => trigger.apply(context, args), interval)
  }
}

const timer = (interval, trigger) => {
  const timerMap = {}

  return (key) => {
    clearTimeout(timerMap[key])

    timerMap[key] = setTimeout(() => {
      trigger(key)
    }, interval)
  }
}

const counter = (max, trigger) => {
  const counterMap = {}

  return (key) => {
    counterMap[key] = counterMap[key] ? ++counterMap[key] : 1

    if ( counterMap[key] >= max ) {
      trigger(key)
      counterMap[key] = 0
    }
  }
}

const mixed = (interval, max, trigger) => {
  const counterMap = {}
  const timerMap   = {}

  return (key) => {
    counterMap[key] = counterMap[key] ? ++counterMap[key] : 1
    clearTimeout(timerMap[key])

    if ( counterMap[key] >= max ) {
      trigger(key)
      counterMap[key] = 0
    } else {
      timerMap[key] = setTimeout(() => {
        trigger(key)
        counterMap[key] = 0
      }, interval)
    }
  }
}

const convoy = (interval, max, trigger) => {
  const counterMap = {}
  const timerMap   = {}

  return (key, func) => {
    counterMap[key] = counterMap[key] ? ++counterMap[key] : 1
    clearTimeout(timerMap[key])

    if ( counterMap[key] >= max ) {
      trigger(key, func)
      counterMap[key] = 0
    } else {
      timerMap[key] = setTimeout(() => {
        trigger(key, func)
        counterMap[key] = 0
      }, interval)
    }
  }
}


module.exports = {
  simple,
  counter,
  timer,
  mixed,
  convoy
}