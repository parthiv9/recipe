import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

export default function Breadcrumbs() {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumb className="custom-breadcrumb my-3">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                Home
            </Breadcrumb.Item>

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                const label = decodeURIComponent(name)
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (l) => l.toUpperCase());

                return isLast ? (
                    <Breadcrumb.Item active key={routeTo}>
                        {label}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item key={routeTo} linkAs={Link} linkProps={{ to: routeTo }}>
                        {label}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}
