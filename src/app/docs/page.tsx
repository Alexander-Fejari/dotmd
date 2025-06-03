'use client';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerSpec from '../../../swagger';

export default function Docs() {
  return <SwaggerUI spec={swaggerSpec} />;
}