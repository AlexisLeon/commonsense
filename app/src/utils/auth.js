import cookie from 'react-cookie'

/*
 * Check if user role is valid for given permission
 *
 * Usage:
    console.log('has admin', hasPermissions('rate-limiter-admin'))
    console.log('hasn\'t XYZ', hasPermissions('rate-limiter-XYZ'))
 */
export function hasPermissions(role) {
  if (typeof role === 'undefined' || role === null || role === '') return false
  if(!cookie.load('token')) return false

  const userRoles = (cookie.load('user')).roles
  const roles = new Set(userRoles)
  const permissions = typeof role  === 'string' ? [role] : role

  for (var i = 0; i < permissions.length; i++) {
    return roles.has(permissions[i])
  }
}
