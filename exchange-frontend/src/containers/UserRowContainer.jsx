import { connect } from 'react-redux';
import UserRow from '../components/UserRow';

const mapStateToProps = state => ({
  address: state.user.address,
});

export default connect(mapStateToProps)(UserRow);
