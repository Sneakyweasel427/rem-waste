import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import Typography from '@mui/material/Typography';
import classnames from "classnames";
import styles from './SkipHire.module.scss';
import SkipHireCard from "../../components/SkipHireCard";


export default function SkipHire({ postCode = 'NR32', area = 'Lowestoft' }) {
    const [skips, setSkips] = useState([]);
    const [selectedSkip, setSelectedSkip] = useState(null);
    const [isSlidingDown, setIsSlidingDown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSkips = async () => {
            try {
                const response = await fetch(
                    `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postCode}&area=${area}`
                );
                if (!response.ok) {
                    console.log("Failed to fetch skips");
                }
                const data = await response.json();
                setSkips(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSkips();
    }, [postCode, area]);

    const onBack = () => {
        console.log('Navigating back');
    }

    const onContinue = () => {
        console.log('Navigating forward');
    }

    const onSkipSelection = (id) => {
        if (selectedSkip === id) {
            setIsSlidingDown(true);

            setTimeout(() => {
                setSelectedSkip(null);
                setIsSlidingDown(false);
            }, 300);
        } else {
            setSelectedSkip(id);
            setIsSlidingDown(false);
        }
    };

    const selectedSkipData = skips.find(skip => skip.id === selectedSkip);

    return (
        <div className={classnames(styles.root, {[styles.itemSelected]: selectedSkipData})}>
            <Typography variant='h2' className={styles.title}>Choose Your Skip Size</Typography>
            <Typography variant='h5' className={styles.subTitle}>Select the skip size that best suits your
                needs</Typography>

            {loading && (
                <div className={styles.loading}>
                    <CircularProgress size={75}/>
                </div>
            )}
            {error && <Typography variant='body1' className={styles.error}>{error}</Typography>}

            <div className={classnames(styles.grid, {[styles.itemSelected]: selectedSkipData})}>
                {skips.map((skip) => (
                    <SkipHireCard
                        key={skip.id}
                        skip={skip}
                        onSelect={() => onSkipSelection(skip.id)}
                        selected={selectedSkip === skip.id}
                    />
                ))}
            </div>

            {(selectedSkipData || isSlidingDown) && (
                <div className={classnames(styles.productInfo, {
                    [styles.itemSelected]: selectedSkipData && !isSlidingDown,
                    [styles.slidingDown]: isSlidingDown
                })}>
                    <div>
                        <Typography variant='body1' className={styles.dNoneXs} sx={{fontWeight: 700}}>{selectedSkipData.hire_period_days}-day hire
                            period</Typography>
                        <Typography variant='h5' className={styles.size}>{selectedSkipData.size} Yard
                            Skip</Typography>

                    </div>
                    <div>
                        <Typography variant='body1' className={styles.dNoneXs} sx={{fontWeight: 700}}>£{selectedSkipData.price_before_vat} per week (exc.
                            VAT)</Typography>
                        <Typography variant='h5' className={styles.total}>
                            <span>Total: </span>£{selectedSkipData.price_before_vat * (selectedSkipData.hire_period_days / 7) + selectedSkipData.vat} (inc.
                            VAT)
                        </Typography>
                    </div>
                    <div>
                        <Button variant='outlined' onClick={onBack}>
                            <Typography variant='body1'>Back</Typography>
                        </Button>
                        <Button variant='outlined' onClick={onContinue}>
                            <Typography variant='body1'>Continue</Typography>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}