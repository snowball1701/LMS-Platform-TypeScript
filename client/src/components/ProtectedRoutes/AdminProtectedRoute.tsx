import { FunctionalComponent, h } from '@stencil/core';
import { apiService } from '../../services/api';

interface RouteProps {
  url: string;
  component: string;
  redirectUrl?: string;
}

export const ProtectedRoute: FunctionalComponent<RouteProps> = ({ url, component, redirectUrl }, children) => {
  if (apiService.isAuthorized()) {
    if (apiService.role() != 'admin') {
      return <ion-route-redirect from={url} to={`/user`} />;
    }

    return (
      <ion-route url={url} component={component}>
        {children}
      </ion-route>
    );
  } else {
    return <ion-route-redirect from={url} to={redirectUrl ?? `/}`} />;
  }
};
