# WhatsApp clone with expo and reanimated 2.0

The goal of this project is to create a simple clone of whatsapp. The focus is on using reanimated 2 to implement the animations.

## Features

- [X] [Custom Top Tab Bar](./src/screens/Tab/index.tsx)
- [X] [Custom Floating action button](./src/screens/Tab/components/FAB.tsx)

## Building a custom Top Tab Bar with reanimated 2.0 

In this project, a horizontal scrollView was used to create a custom top tab with the help of reanimated 2. This made it easier to perform UI animations based on the scrollView offset. 

One of the challenging part was how to create an effect that is fired only when a screen is focused. For example when the app loads, because we are using a scrollView, all the tab screens are mounted at the same time. Including the camera. This is not ideal, the camera should only be running when the Camera screen is focused. Thankfully React Context came to the rescue

A [context was created](src\context\TabBar.ts) to provide the name of the active/focused screen. This was made a shared value so as to prevent unnecessary rerendering.

```js
    export const CurrentTabScreenContext = React.createContext<SharedValue<TabRoutes>>({value: "Camera"});
```

A shared value ```activeTabScreenName``` is used to stored the name of the active screen via an onScroll callback with reanimated 2

```js
     const scrollHandler = useAnimatedScrollHandler({
        onScroll: ({ contentOffset }) => {
            scrollOffset.value = contentOffset.x;
            const currentIndex = Math.abs(Math.round(scrollOffset.value / width));
            activeTabScreenName.value = TAB_SCREENS[currentIndex];
        },
  });
```

The scrollView was then wrapped with the CurrentTabScreenContext provider

```ts
        <CurrentTabScreenContext.Provider value={activeTabScreenName}>
            <Animated.ScrollView
            ref={scrollRef}
            onScroll={scrollHandler}
            horizontal
            snapToAlignment={"center"}
            snapToInterval={width}
            contentOffset={{ x: width, y: 0 }}
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
            >
                <Camera />
                <Chats />
                <Status />
                <Calls />
            </Animated.ScrollView>
      </CurrentTabScreenContext.Provider>
```

Next a hook is created which uses ```CurrentTabScreenContext``` to check if a screen is focused

```js
const TAB_SCREENS: TabRoutes[] = ["Camera", "Chat", "Status", "Calls"];

const useIsTopTabScreenFocused = (screenName: TabRoutes) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  const currentScreenName = useContext(CurrentTabScreenContext);

  useAnimatedReaction(
    () => currentScreenName.value,
    (screen) => {
      const isScreenActive = screen === screenName;
      runOnJS(setIsScreenFocused)(isScreenActive);
    }
  );

  return isScreenFocused;
};
``` 

This hook takes the name of a screen as an argument and returns a state indicating if the screen is focused or not. Using the ```useAnimatedReaction``` hook we can run a function anytime currentScreenName changes.  

<br/>

## Getting started

- Clone the repo
  
    ```bash
    git clone https://github.com/uwemneku/whatsapp-expo.git
    ```

- Install dependencies
  
    ```bash
        npm install
    ```
    <p align="center"> or </p>

    ```bash
        yarn
    ```

- Start the app
  
    ```bash
        yarn start
    ```