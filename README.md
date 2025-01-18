# GeoProfile Explorer

## Overview

This web application is built using **React.js** and allows users to view a list of profiles and interactively explore the addresses associated with each profile on a map. The app provides an intuitive and user-friendly interface to navigate through profiles and visualize their geographic locations.

## Features

1. **Profile Display**: 
   - Presents a collection of profiles, each comprising essential information such as the person's name, photograph, and a brief description.
   
2. **Interactive Mapping**: 
   - Incorporates an interactive map component that dynamically displays addresses based on user interactions. This allows users to see the geographical location associated with each profile.
   
3. **Summary Integration**: 
   - Implements a "Summary" button adjacent to each profile. Clicking this button triggers the display of the map component with a marker indicating the precise address of the selected profile.
   
4. **Map Services Integration (Good to Have)**: 
   - Utilizes external map services like **Google Maps** or **Mapbox** to integrate the mapping functionality into the application. This includes setting up markers and rendering addresses correctly on the map.
   
5. **User-Friendly Experience**: 
   - Ensures that the application offers a smooth and intuitive user experience, enabling users to easily navigate profiles and access mapped addresses without confusion.
   
6. **Profile Data Management**: 
   - Allows administrators to add, edit, or delete profiles via an admin panel or dashboard, making profile data management efficient.
   
7. **Search and Filter Functionality**: 
   - Provides users with the ability to search and filter profiles based on different criteria, such as name, location, or other attributes. This enhances the usability of the application.
   
8. **Responsive Design**: 
   - Ensures that the application is responsive and mobile-friendly so that users can access it from various devices, including smartphones and tablets.

## Troubleshooting

- **Data not showing?** 
   - If the data does not show, please reload the application. This can happen if the profiles have not been fetched successfully. Simply refresh the page to reload the data.

## Technologies Used

- **React.js** for the frontend
- **Leaflet** for map rendering and interactivity
- **Local Storage** for storing the data
- **React-Leaflet** for integrating Leaflet with React
- **Tailwind css** for styling the application

## Installation

To get started with the project, clone this repository and install the dependencies.

```bash
git clone https://github.com/your-username/profile-map-explorer.git
cd profile-map-explorer
npm install
