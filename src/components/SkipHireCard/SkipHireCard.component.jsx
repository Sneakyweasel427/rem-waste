import styles from './SkipHireCard.module.scss';
import { CircleCheck } from "lucide-react";
import { Card, CardActionArea, Typography } from "@mui/material";
import classnames from 'classnames';
import {useState} from "react";

export default function SkipHireCard({ skip = {}, onSelect = () => {}, selected = false }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            className={classnames(styles.root, {[styles.selected]: selected, [styles.hovered]: isHovered})}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardActionArea
                className={styles.cardActionArea}
                onClick={onSelect}

                data-active={selected ? '' : undefined}
            >
                {/*<div className={styles.cardHeader}>*/}
                {/*    <div><Typography variant='body1' className={styles.imgTitle}>{skip.size} Yards</Typography></div>*/}
                {/*    /!*{selected && (*!/*/}
                {/*    /!*    <div className={styles.checkIconContainer}>*!/*/}
                {/*    /!*        <CircleCheck className={styles.checkIcon}/>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*)}*!/*/}
                {/*</div>*/}
                <div className={styles.selectedIcon}>
                    <CircleCheck className={styles.buttonIcon}/>
                </div>
                <div className={styles.skipDetails}>
                        <Typography variant='h6' className={styles.skipSize}>{skip.size} Yard Skip</Typography>
                </div>
                <div className={styles.priceContainer}>
                    <Typography variant='h3' className={styles.price}>£{skip.price_before_vat}</Typography>
                    <Typography variant='body1' className={styles.pricePeriod}>per week</Typography>
                    <Typography variant='body1' className={styles.hirePeriod}>{skip.hire_period_days}-day hire period</Typography>
                </div>

                <div className={styles.selectButton}>
                    {selected ? <Typography variant='body1'>Selected</Typography> : <Typography variant='body1'>Select</Typography>}
                </div>

                {/*<div className={styles.imgContainer}>*/}
                {/*    <img*/}
                {/*        src="https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800"*/}
                {/*        alt={`${skip.size} Yard Skip`}*/}
                {/*        className={styles.img}*/}
                {/*    />*/}
                {/*</div>*/}


            </CardActionArea>
        </Card>
    );
}
