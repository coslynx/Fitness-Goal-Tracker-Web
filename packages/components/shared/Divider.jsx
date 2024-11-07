import styled from '@emotion/styled';

const CustomDivider = styled.hr`
  border: 1px solid #ccc;
  margin: 2rem 0;
`;

const Divider = ({ className, ...rest }) => {
  return (
    <CustomDivider className={className} {...rest} />
  );
};

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;