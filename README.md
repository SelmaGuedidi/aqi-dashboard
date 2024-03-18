# Dashboard

This project is an Angular application that includes three main components: the dashboard, a map component, and line cards.


## Components

### Dashboard
The dashboard component is the main component of the application. It displays various data visualizations and summary information.

Reference: 'https://www.smashingmagazine.com/2020/07/responsive-dashboard-angular-material-ng2-charts-schematics/'


### Map
The map component displays a map with markers or other relevant data points. It can be interactive and provide additional details when clicked.

Reference: 'https://observablehq.com/@observablehq/plot-choropleth?intent=fork'

### Mini Card
The mini cards component displays an icon with a value and a title.

## TODO:

1. At the moment, I'm reading a csv file stored within the assets. Finish the data upload to a dataset in the python project and rewrite the service to query from the dataset.

2. Add Filters for parameter, month and season.

3. The tooltips in the map aren't working. Try to fix it. If that doesn't work, write an individual component to show the states and their average value.

4. Add more charts to the dashboard.