"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const manager_secrets_1 = require("../../modules/Common/manager-secrets");
const handler = async (_event) => {
    const secretName = process.env.SECRET_NAME;
    if (!secretName) {
        throw new Error('Environment variable SECRET_NAME is not defined');
    }
    try {
        const manageSecrets = new manager_secrets_1.ManageSecrets({ secretName });
        const secretRetunr = manageSecrets.getSecretValue();
        return secretRetunr;
    }
    catch (error) {
        console.error(error);
        throw new Error(`Error retrieving secret: ${error.message}`);
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjcmV0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL2NvbW1vbi9zZWNyZXRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBFQUFvRTtBQUU3RCxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsTUFBVyxFQUFFLEVBQUU7SUFDM0MsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDM0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztLQUNwRTtJQUNELElBQUk7UUFDRixNQUFNLGFBQWEsR0FBRyxJQUFJLCtCQUFhLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sWUFBWSxHQUFJLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyRCxPQUFPLFlBQVksQ0FBQTtLQUNwQjtJQUFDLE9BQU8sS0FBVyxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDOUQ7QUFDSCxDQUFDLENBQUM7QUFiVyxRQUFBLE9BQU8sV0FhbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5hZ2VTZWNyZXRzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9Db21tb24vbWFuYWdlci1zZWNyZXRzJ1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChfZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zdCBzZWNyZXROYW1lID0gcHJvY2Vzcy5lbnYuU0VDUkVUX05BTUU7XG4gIGlmICghc2VjcmV0TmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRW52aXJvbm1lbnQgdmFyaWFibGUgU0VDUkVUX05BTUUgaXMgbm90IGRlZmluZWQnKTtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IG1hbmFnZVNlY3JldHMgPSBuZXcgTWFuYWdlU2VjcmV0cyh7c2VjcmV0TmFtZX0pO1xuICAgIGNvbnN0IHNlY3JldFJldHVuciAgPSBtYW5hZ2VTZWNyZXRzLmdldFNlY3JldFZhbHVlKCk7XG4gICAgcmV0dXJuIHNlY3JldFJldHVuclxuICB9IGNhdGNoIChlcnJvciA6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3IgcmV0cmlldmluZyBzZWNyZXQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgfVxufTtcbiJdfQ==