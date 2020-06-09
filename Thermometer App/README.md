# Thermometer App

The project is inspired by [this article](https://www.leparisien.fr/high-tech/honor-lance-un-smartphone-capable-de-prendre-votre-temperature-09-06-2020-8332161.php) describing the launch of a mobile phone natively equipped to check the temperature with infrared technology.

In terms of style, [this design](https://dribbble.com/shots/6768800-Grill-App) detailing a Grill App motivates the SVG elements included atop the controls.

The controls should allow to:

- toggle the unit of measure (C or F)

- change the minimum, maximum, and current value

The three values should be modified with an input of type number, and only as the blur event is registered. At a later stage, include some form of error validation whereby a toast message shows the valid input values. Consider for instance: have the minimum value be small than the maximum, have the current value in the [min, max] range.
