# WhatsApp clone with expo and reanimated 2.0

The goal of this project is to create a simple clone of whatsapp. The focus is on using reanimated 2 to implement the animations.

## Features

- [X] [Custom Top Tab Bar](./src/screens/Tab/index.tsx)
- [X] [Custom Floating action button](./src/screens/Tab/components/FAB.tsx)

## Building a custom Top Tab Bar with reanimated 2.0 

In this project, a horizontal scrollView was used to create a custom top tab with the help of reanimated 2. This made it easier to perform UI animations based on the scrollView offset. 

One of the challenging part was how to create a effect that is fired only when a screen is focused. For example when the app loads, because we are using a scrollView, all the tab screens are mounted at the same time. Including the camera. This was not ideal, the camera should only be running when the Camera screen is focused. Thankfully React Context came to the rescue

A [context was created](src\context\TabBar.ts) to provide the index of the active/focused screen. This was made a shared value so as to prevent unnecessary rerendering.

```js
    const CurrentTabContext = React.createContext<SharedValue<number>>(undefined);
```

The current index value was set in onScroll callBack function that was set using reanimated 2

```js
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: ({ contentOffset }) => {
        scrollOffset.value = contentOffset.x;
        currentIndex.value = Math.abs(Math.round(scrollOffset.value / width));
        //"width" is the width of all screens in the top tab 
        },
    });
```

The scrollView was then wrapped with the CurrentTabContext provider

```ts
        <></>
        <CurrentTabContext.Provider value={currentIndex}>
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
      </CurrentTabContext.Provider>
```

Next a hook was created to check if a screen is focused

```js
const TAB_SCREENS: TabRoutes[] = ["Camera", "Chat", "Status", "Calls"];

const useIsTopTabScreenFocused = (screenName: TabRoutes) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  const currentIndex = useContext(CurrentTabContext);
  
  //This hook was used because currentIndex is a shared value and we wish to run a function any time it changes
  useAnimatedReaction(
    () => currentIndex.value,
    (i) => {
      const isScreenActive = TAB_SCREENS[i] === screenName;
      runOnJS(setIsScreenFocused)(isScreenActive);
    }
  );

  return isScreenFocused;
};
``` 

This hook takes the name of a screen as an argument and returns a state indicating if the screen is focused or not. Using the ```useAnimatedReaction``` hook we can run a function anytime the current index changes.  

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