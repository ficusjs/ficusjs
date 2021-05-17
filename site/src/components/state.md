---
layout: main.njk
title: FicusJS documentation - Components - State
---
# State

State in components can be implemented using a number of patterns and functions.

## Local state

Local state is private to a component. It is a set of independent variables in a component and their values at any point in time.

Changing state triggers a re-evaluation of the variables causing a render of the component.

Components created with the `createCustomElement` function can be extended to include local state using the `withLocalState` function.

If creating components using the `createComponent` function, local state is automatically provided.

## State machines and statecharts

A finite state machine is an alternative way of modeling component state; instead of defining independent variables, a machine is crafted specifically to handle what states are possible, and when a machine is a given state, what next state is allowed.

Statecharts are the "bigger brother" of state machines, designed to overcome the limitations of state machines. A statechart is essentially a state machine that allows any state to include more machines, in a hierarchical fashion.

Components created with the `createCustomElement` function can be extended to include a lightweight state machine using the `withStateMachine` function.

[XState](https://xstate.js.org) is a library for creating, interpreting, and executing finite state machines and statecharts, as well as managing invocations of those machines as actors.
Components can be extended to integrate interpreted statecharts (known as a service) using the `withXStateService` function.

## Application state

Application state is referred to as a store. It is a set of independent variables, and their values at any point in time created globally and shared across multiple components.

Changing application state notifies any components listening for changes causing a render of those components.

Creating stores for application state is done using the `createAppState` function.
Components can be extended to listen for store changes using the `withStore` function.
