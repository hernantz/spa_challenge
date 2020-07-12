import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { useStatus, ERROR, LOADING } from '@rootstrap/redux-tools';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { geocode as geocodeValidations } from 'utils/constraints';
import { useForm, useValidation, useTextInputProps } from 'hooks';
import { geocode } from 'state/actions/geocodeActions';

const messages = defineMessages({
  address: { id: 'geocode.form.address' }
});

const fields = {
  address: 'address',
};

export const GeocodeForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(geocode);
  const validator = useValidation(geocodeValidations);
  const { values, errors, handleValueChange, handleSubmit, handleBlur } = useForm(
    {
      onSubmit,
      validator,
      validateOnBlur: true
    },
    [onSubmit]
  );

  const inputProps = useTextInputProps({ handleValueChange, handleBlur, values, errors });

  return (
    <form onSubmit={handleSubmit}>
      {status === ERROR && <strong>{error}</strong>}
      <div>
        <Input
          name="address"
          type="text"
          label={intl.formatMessage(messages.address)}
          {...inputProps(fields.address)}
        />
      </div>
      <button type="submit">
        <FormattedMessage id="geocode.form.submit" />
      </button>
      {status === LOADING && <Loading />}
    </form>
  );
};

GeocodeForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(GeocodeForm);
