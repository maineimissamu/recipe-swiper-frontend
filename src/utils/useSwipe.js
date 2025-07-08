import {useSwipeable} from 'react-swipeable';

export const useSwipe = (onLike, onDislike, onSwiping) => {
    const handlers = useSwipeable({
        onSwipedLeft: onDislike,
        onSwipedRight: onLike,
        onSwiping: (eventData) => {
            if (onSwiping) {
                onSwiping(eventData);
            }
        },
        delta: 30,
        velocity: 0.1,
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: true,
        touchEventOptions: { passive: false },
    });

    return handlers;
}