import { Fragment } from 'react';

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = props => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <button>Cart</button>
            </header>
            <div className={classes['main-image']}> {/* we write the classname like this in this case because there is a dash in the classname, which keeps us from using regular dot notation */}
                <img src={mealsImage} alt="table of food" />
            </div>
        </Fragment>
    );
};

export default Header;