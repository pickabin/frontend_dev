import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  monitor: PropTypes.array.isRequired
};

export default function ProductList({ monitor, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {monitor.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
