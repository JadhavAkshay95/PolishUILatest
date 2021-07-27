import React, { ReactNode } from 'react';
import { FormControl, makeStyles } from '@material-ui/core';
import { Label } from 'components/UI';

import clsx from 'clsx';

interface FormItemLabelProps {
  error?: string;
  label?: string;
  noBorder?: boolean;
  formControlClass?: any;
  showRequired?: boolean;
  children: ReactNode;
  [key: string]: any;
}

const useStyle = makeStyles((theme) => ({
  field: {
    borderRadius: 6,
    border: ({ noBorder }: { noBorder?: boolean }) =>
      noBorder ? 'none' : `1px solid ${theme.colors.inputBorder}`,
    height: 44,
  },
  errorMsg: {
    display: 'block',
    minHeight: 20,
    textAlign: 'left',
    color: theme.colors.error,
  },
  label: {
    marginBottom: 4,
    fontWeight: theme.typography.fontWeightBold,
  },
  required: {
    '&:after': {
      content: "'*'",
      color: theme.colors.error,
    },
  },
}));

export const FormItemLabel = ({
  error,
  label,
  noBorder,
  formControlClass,
  children,
  showRequired = false,
  ...others
}: FormItemLabelProps) => {
  const classes = useStyle({ noBorder });
  return (
    <div {...others}>
      {label && (
        <Label
          component="div"
          variant="caption"
          color="secondaryText"
          className={clsx(classes.label, showRequired && classes.required)}
        >
          {label}
        </Label>
      )}
      <FormControl className={`${classes.field} ${formControlClass}`} fullWidth>
        {children}
      </FormControl>
      <Label component="span" variant="overline" className={classes.errorMsg}>
        {error}
      </Label>
    </div>
  );
};
