---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - Defining state machines
---
# Defining state machines

Finite state machines and statecharts are a visual language used to describe the states in a process.

You may have used similar diagrams in the past to design user flows, plan databases or map app architecture. Statecharts are another way of using boxes and arrows to represent flows, but with FicusJS these flows are also executable code that can be used to control the logic in your applications.

This guide covers the basics of statecharts in a beginner-friendly way, including:

- States
- Transitions and events
- Initial state
- Final state
- Planning statecharts
- Actions
- Further reading

## States

The `states` are represented by rounded rectangle boxes. To draw a statechart for the process of a dog, there are two states that would first come to mind:

![](/assets/img/fsm/asleep-awake.svg)

A dog is always `asleep` or `awake`. The dog can’t be asleep and awake at the same time, and it’s impossible for the dog to be neither asleep nor awake. There’s only these two states, a precisely limited, _finite_ number of states.

## Transitions and events

How the dog goes between `asleep` and `awake` is through _transitions_, which are symbolized by an arrow pointing from one state to the next state in the process’s sequence.

![](/assets/img/fsm/transitions-events.svg)

A transition is caused by an event that results in the change of state. Transitions are labelled with their events.

Transitions and events are deterministic. Deterministic means that each transition and event always points to the same next state, and always produces the same result from their given starting condition, every time the process is run. Dogs never `wake up` to become `asleep` or `fall asleep` to become `awake`.

This tiny dog process, with its two finite states and two transitions is a _Finite State Machine_. A state machine is used to describe the behavior of something. The machine describes the thing’s states and the transitions between those states. It’s a Finite State Machine because it has a finite number of states. (Sometimes abbreviated to FSM by folks who love jargon).

## Initial state

Any process that has states will have an _initial_ state, the default state the process exists in until an event happens to change the process’s state.

The initial state is represented by a filled circle with an arrow pointing from the circle to the initial state.

![](/assets/img/fsm/initial-state.svg)

Using a statechart to describe the process of walking the dog, the initial state would be waiting to walk.

## Final state

Most processes with states will have a _final_ state, the last state when the process is finished. The final state is represented by a double border on the state’s rounded rectangle box.

In the dog walking statechart, the final state would be `walk complete`.

![](/assets/img/fsm/final-state.svg)

## Planning statecharts

One of the benefits of statecharts is that, in the process of putting a statechart together, you explore all the possible states in your process. This exploration will help you avoid bugs and errors in your code as you’re more likely to cover all the eventualities.

And because statecharts are executable, they can behave as both the diagram and the code, making it less likely that you’ll introduce differences or bugs interpreting between the diagramming and coding environments.

### Planning a statechart for a login machine

To draw a statechart for a login machine, start by listing the basic events in the process. Think about what your login process will do:

- log in
- log out

Then list the states that exist as a result of those events:

- logged in
- logged out

Once there’s some events and states, there’s the beginnings of a statechart.

![](/assets/img/fsm/basic-login.svg)

Don’t forget the _initial state_. In this case, the `logged out` state is the initial state, as any new user would come to the process logged out.

## Actions

A statechart is used to set off actions in the system outside of the statechart. Actions are also commonly known as `effects` or `side-effects`. “Side effects” sounds like a negative or unimportant term, but setting off actions is the primary purpose in using statecharts.

Actions are events that have no impact or consequences for the rest of the sequence, the event is just triggered and the sequence moves on to the next step in the process. For example, the login statechart might execute actions that change the user interface.

An `action` can be fired upon entering or exiting a state, or on a transition. An action on a state is included inside the state’s container with an “entry /” or “exit /” label depending on whether the action should be fired on entry or exit from the state.

## Further reading

To find out more about Statecharts and state machines using XState, visit the docs:

[https://xstate.js.org/docs/](https://xstate.js.org/docs/)
